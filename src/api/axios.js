import axios from 'axios';

export const fetchQuestions = async (amount = 5) => {
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&category=27`);
  return response.data.results;
};
