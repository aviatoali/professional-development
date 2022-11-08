
const groupMembers = [
    'Meghan Guse',
    'Megan Matthews',
    'Ali Shah',
    'Scotty Stossel'
];

exports.getGroupMembers = (request, response) => {
    response.send(groupMembers);
};
