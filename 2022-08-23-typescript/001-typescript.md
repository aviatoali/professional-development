# TypeScript

## What is it?

As you already know, TypeScript is a way to turn JavaScript, a loosely typed language, into a strongly typed language.

## Why???

I'll be honest. I did not like TypeScript when I first started using it. It feels *heavy*. JavaScript already works just fine without TypeScript, and TypeScript doesn't even get executed in the browser! Why use it at all?

Well, let's look at this example in Ember. The intent here is to create a computed property that returns an array of only the visible contacts. But something is going wrong:

```javascript
contactList: [],

visibleContacts: computed('contactsList', function() {
  return this.get('contactsList').filterBy('visible', true);
}),
```

We're getting an error in *production* over this:

> Cannot read properties of undefined (reading 'filterBy')

What the heck?

Take a closer look at the name of the property. `contactList`. We're filtering on `contactsList`! And our IDE had no idea.

Let's check out the same example in React, with the same typo. Initially you might be put off by how much code you had to write:

```javascript
type Props = {
  contactList: Contact[];
};

const App: React.FC<Props> = ({ contactList }) => {
  const visibleContacts = useMemo(() => contactsList.filter(c => c.visible)), [contactList]);
}
```

But our IDE is going to freak out at us because of the bug. So is the compiler, and so is the GitLab pipeline. We can't even get this error in *staging* to say nothing of ending up with a production error.

## What should you do with it?

### Type your React components

```javascript
type Props = {
  deals: Deal[];
};

const DealsList: React.FC<Props> = ({ deals }) => {
  return (
    <ul>
      {deals.map(deal => <Deal key={deal.id} deal={deal} />)}
    </ul>
  );
}
```

Why do this? Well, it makes sure you know what the data looks like that you're dealing with. You want your IDE to yell at you before your users do.

### Type your API responses

```javascript
type DealStage = {
  id: number;
  title: string;
  group: number;
}

type DealStagesResponse = {
	data: {
		dealStages: DealStage[];
		meta?: {
			total: string;
		};
	};
};

const fetchDealStages = (): Promise<AxiosResponse> =>
	axios.get(`api/3/dealStages`);

export const useDealStages = (): UseQueryResult<DealStagesResponse> => {
	return useQuery(QueryKey.DealStages, fetchDealStages);
};
```

#### A Problem

Question: What if the API returns this:

```json
{
  "data": {
    "dealStages": [
      {
        "id": 1,
        "name": "Follow Up",
        "group": "5"
      }
    ]
  }
}
```

We've got a problem! Two problems, actually. The `group` is a `string`, and it actually says `name`, and not `title`.

But TypeScript is going to be smart enough to know that something is wrong, right?

**Nope**. By the time this code is running, the TypeScript is completely compiled out. This API response is only coming in at runtime so the IDE just has to trust us that the API response is going to match the type we defined.

#### Solutions

##### Type Checking

```javascript
if ('title' in deal) {
  // Do something
}
```

Determine at runtime whether the object has the properties you want.

##### Partial

```javascript
type DealStagesResponse = {
	data: {
		dealStages: Partial<DealStage>[];
		meta?: {
			total: string;
		};
	};
};
```

`Partial` sets every property as optional, i.e. the type of this object is a partial DealStage. So `Partial<DealStage>` is the same as:

```javascript
type DealStage = {
  id?: number;
  title?: string;
  group?: number;
}
```

This will encourage you later on to ensure that the property is present:

```javascript
{deal.title?.toLowerCase()}
```

##### Casting and setting defaults

```javascript
const realDeal = {
  id: +deal.id,
  title: `${deal.title}`,
  group: +deal.group
};
```

This ensures that you have *something* and that it's the right data type.

### Use Generics

Compare this:

```javascript
type Notification = {
  event: string;
  item: Contact | Deal | Account;
  timestamp: Date;
};

const notification: Notification = {
  event: 'added',
  item: contact,
  timestamp: new Date()
};
```

to this:

```javascript
type Notification<T> = {
  event: string;
  item: T;
  timestamp: Date;
};

const notification: Notification<Contact> = {
  event: 'added',
  item: contact,
  timestamp: new Date()
};
```

The former technically works, but it's not that useful because `notification.item` could be one of three things, and now I have to chain all of the possible `item` types on the original type.
