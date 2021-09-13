import API_ENDPOINT from '../global/api-endpoint';
import Auth from './auth';

const Job = {
  async getJobs() {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(API_ENDPOINT.JOB, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();
    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async getJob(id) {
    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(`${API_ENDPOINT.JOB}?id=${id}`, {
      headers: {
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status === 404) return null;

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async newJob(inputData) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const responsePost = await fetch(API_ENDPOINT.JOB, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ ...inputData }),
    });

    if (responsePost.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }
    const responsePostJSON = await responsePost.json();

    if (responsePost.status !== 200) throw new Error(responsePostJSON.message);

    return responsePostJSON;
  },

  async updateJob(inputData) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(`${API_ENDPOINT.JOB}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify(inputData),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },

  async deleteJob(jobId) {
    if (!navigator.onLine) throw new Error('Network connection is needed.');

    const { authId, authToken } = await Auth.getAuth();

    const response = await fetch(`${API_ENDPOINT.JOB}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': authId,
        'X-Auth-Token': authToken,
      },
      body: JSON.stringify({ job_id: jobId }),
    });

    if (response.status === 500) {
      throw new Error('There was an error from the server, or server maintenance occured.');
    }

    const responseJSON = await response.json();

    if (response.status !== 200) throw new Error(responseJSON.message);

    return responseJSON;
  },
};

export default Job;
