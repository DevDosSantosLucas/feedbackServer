import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../Feedbacks-repositories";

export class PrismaFeedbacksRepository implements FeedbackRepository{
  async create({type,comment,screenshot}: FeedbackCreateData) {
    await prisma.feedback.create({
      data:{
        type,
        comment,
        screenshot
      }
    })
  }
}