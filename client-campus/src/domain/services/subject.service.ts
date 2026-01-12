import type { Subject } from "../entities/subject.interface";

export class subjectService{
    subject: Subject;

    constructor(subject: Subject){
        this.subject= subject;
    }
}