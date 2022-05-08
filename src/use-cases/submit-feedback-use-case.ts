import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/Feedbacks-repositories";
// import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type:string;
  comment:string;
  screenshot?:string;
}

export class SubmitFeedbackUseCase{
  // private feedbacksRepository:FeedbackRepository

  // constructor(
  //   feedbackRepository:FeedbackRepository,
  // ){
  //   this.feedbacksRepository = feedbackRepository
  // }
 

  constructor(
    private feedbacksRepository:FeedbackRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request:SubmitFeedbackUseCaseRequest){
    const {type,comment,screenshot} =request;
    if(!type){
      throw new Error('Type is required.');
    }
    if(!comment){
      throw new Error('Type is required.');
    }

    if(screenshot&& ! screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
    }

    // const prismaFeedbacksRepository =new PrismaFeedbacksRepository(); 

    // await prismaFeedbacksRepository.create({
    await this.feedbacksRepository.create({

      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body:[
        `<div style= "font-family: sans-serif;font-size:16px;color:#111;"> `,
        `<p>Tipo do Feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot? `<img src= "${screenshot}" />`:``,
        `</div>`
      ].join('\n')
    })
  }
}