import 'react-toastify/dist/ReactToastify.css';

const PushToQuestionsFailed = async ({ studentExamId, failedQuestions }) => {
    const PushToQuestionsFailedApiUrl = `https://localhost:7252/api/StudentExam/push-to-questions-failed/${studentExamId}`;
        const response = await fetch(PushToQuestionsFailedApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(failedQuestions),
        });
  
        if (!response.ok) {
          console.error("failed to push to questionsFailed")
          throw new Error('Failed to create entity');
        }
        return response;
  };

export default PushToQuestionsFailed;
