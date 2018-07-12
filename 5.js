const team = {
    members: ['Superman','Batman','Wonder Woman'],
    teamName: 'Justice league',
    teamSummary: function() {
        return this.members.map(function(member) {
            return `${member} is on team ${this.teamName}`;
        });
    }
};

team.teamSummary();


// it will print undefined istead of the this.teamName
// because of the "this" in the function passed to the map function is not the same as "team" object
// One way to fix this bug is to change passed function to es6 arrow function where this is binded to current object on which the function was called

// corrected code looks like this

const team = {
    members: ['Superman','Batman','Wonder Woman'],
    teamName: 'Justice league',
    teamSummary: function() {
        return this.members.map((member) => {
            return `${member} is on team ${this.teamName}`;
        });
    }
};

team.teamSummary();
