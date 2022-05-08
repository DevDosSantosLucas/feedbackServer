// test('sum 2+2', ()=>{
//   expect(2+2).toBe(4)
// })

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()


import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"
const submitFeedback = new SubmitFeedbackUseCase(
  // {create: async() =>{}},
  // {sendMail: async () => {}}
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
)

describe('Submit feedback',() =>{


  it('should be able to submit a feedback', async() =>{


   await expect (submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,jh498yb94yueb936749',
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()


  })

  it('should not be able to submit a feedback without type', async() =>{


   await expect (submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,jh498yb94yueb936749',
    })).rejects.toThrow()

  })

  it('should not be able to submit a feedback without comment', async() =>{


    await expect (submitFeedback.execute({
       type: 'BUG',
       comment: '',
       screenshot: 'data:image/png;base64,jh498yb94yueb936749',
     })).rejects.toThrow()
 
   })

   it('should not be able to submit a feedback without screenshot', async() =>{


    await expect (submitFeedback.execute({
       type: 'BUG',
       comment: 'example comment',
       screenshot: 'test.jpg',
     })).rejects.toThrow()
 
   })
})