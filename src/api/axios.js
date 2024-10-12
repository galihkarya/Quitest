import axios from 'axios';

export const fetchQuestions = async () => {
  const response = await axios.get(`https://opentdb.com/api.php?amount=5&category=27`);
  return response.data.results;
};
