import { v4 as uuid } from "uuid";

export class Trainer {
    id = uuid();

    constructor(firstName, lastName, email, isCurrentlyTeaching, timeEmplyed, coursesFinished) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.isCurrentlyTeaching = isCurrentlyTeaching;
        this.timeEmplyed = timeEmplyed;
        this.coursesFinished = coursesFinished;
    }
}
