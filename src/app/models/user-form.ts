export interface IUserForm {
    answers: IAnswer[]
}

export interface IAnswer {
    questionKey: string
    answer: string
}