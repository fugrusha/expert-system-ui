export interface IQuestion {
    id: string
    key: string
    questionType: string
    question: string
    comment: string
    order: number
    answers: [string]
}
