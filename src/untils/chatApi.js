import axios from 'axios';

const ADMIN_ACCESS_TOKEN = '3KQNzcjHWjBZky688kR9J7w1';
const PLATFORM_ACCESS_TOKEN = '8JkMt6onkkniHx8Q6Lvicbp2';
const baseUrl = 'https://chat.onexus.net/api/v1/';
const baseURLPlatform = 'https://chat.onexus.net/platform/api/v1/';
const data = {
  name: 'NV002cuongtesting',
  email: 'testing@wk.com',
  role: 'agent',
};

const config = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    api_access_token: ADMIN_ACCESS_TOKEN,
  },
};

const configAgent = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'api_access_token': PLATFORM_ACCESS_TOKEN
  }
};

export const createAccount = async () =>
  await axios.post(`${baseUrl}accounts/1/agents`, data, config);


export const getAnAccountDetails = async () => {
  return await axios.get(`${baseUrl}accounts/1`, config);
};

// export const updateAnAccount = async () =>
//   axios.patch(
//     `${baseUrl}accounts/1`,

//////// Contact  ///////////////////////
export const GetListContacts = async () => await axios.get(`${baseUrl}1/contacts`, config);
export const CreateContact = async (data) =>
  await await axios.post(
    `${baseUrl}1/contacts`,
    {
      name: 'NV002blingbling',
      email: 'tester@wk.com',
      role: 'agent',
    },
    config,
  );

export const deleteAnAccount = async () => await axios.delete(`${baseUrl}accounts/1`, config);

export const GetAllAgent = async () => await axios.get(`${baseUrl}accounts/1/agents`, config);

export const createAnAccountUser = async () =>
  await axios.post(
    `${baseUrl}accounts/1/account_users`,
    {
      user_id: 1,
      role: 'agent',
    },
    config,
  );


export const deleteAnAccountUser = async () =>
  await axios.delete(
    `${baseUrl}1/account_users`,
    {
      user_id: 0,
    },
    config,
  );

export const listAllAgentBots = async () => await axios.get(`${baseUrl}agent_bots`, config);

export const createAnAgentBot = async () =>
  await axios.post(
    `${baseUrl}agent_bots`,
    {
      name: 'test',
      description: 'test',
      outgoing_url: 'string',
    },
    config,
  );

export const getAnAgentBotDetails = async () => await axios.get(`${baseUrl}agent_bots/1`, config);

export const updateAnAgentBot = async () =>
  await axios.patch(
    `${baseUrl}agent_bots/1`,
    {
      name: 'editAgentBot',
      description: 'Test',
      outgoing_url: 'test',
    },
    config,
  );

export const deleteAnAgentBot = async () => await axios.delete(`${baseUrl}agent_bots/1`, config);

// export const createUser = async () =>
//   await axios.post(
//     `${baseUrl}users`,
export const UpdateContact = async (data) =>
  await axios.put(
    `${baseUrl}1/contacts/1`,

    {
      name: 'string',
      email: 'string',
      password: 'string',
      custom_attributes: {},
    },
    config,
  );

export const getUserDetails = async () => await axios.get(`${baseUrl}users/1`, config);

export const updateUser = async () =>
  await axios.patch(
    `${baseUrl}users/1`,
    {
      name: 'usertesting',
      email: 'usertesting@gmail.com',
      password: '1234',
      custom_attributes: {},
    },
    config,
  );

export const deleteUser = async () => await axios.delete(`${baseUrl}users/1`, config);

export const getUserSSO = async () => await axios.get(`${baseUrl}users/1/login`, config);

export const accountListAgentBots = async () =>
  await axios.get(`${baseUrl}accounts/1/agent_bots`, config);
// export const accountcreateAgentBot = async () =>
//   await axios.post(
//     `${baseUrl}accounts/1/agent_bots`,

export const ShowContact = async () => await axios.get(`${baseUrl}1/contacts/1`, config);
export const DeleteContact = async () => await axios.delete(`${baseUrl}1/contacts/1`, config);
export const ContactConversaton = async () =>
  await axios.get(`${baseUrl}1/contacts/1/conversations`, config);
export const SearchContact = async () => await axios.get(`${baseUrl}1/contacts/search`, config);

//INBOX
export const GetListAllInbox = async () => await axios.get(`${baseUrl}1/inboxes`, config);
export const GetAnInbox = async () => await axios.get(`${baseUrl}/1/inboxes/1`, config);
export const CreateAnInbox = async (data) =>
  await axios.post(
    `${baseUrl}1/inboxes/`,

    {
      name: 'string',
      description: 'string',
      outgoing_url: 'string',
    },
    config,
  );

export const accountAgentBotDetails = async () =>
  await axios.get(`${baseUrl}accounts/1/agent_bots/1`, config);


export const accountUpdateAgentBot = async () =>
  await axios.patch(
    `${baseUrl}accounts/1/agent_bots/1`,
    {
      name: 'string',
      description: 'string',
      outgoing_url: 'string',
    },
    config,
  );

export const accountDeleteAgentBot = async () =>
  await axios.delete(`${baseUrl}accounts/1/agent_bots/1`, config);

export const listAgentsInAccount = async () =>
  await axios.get(`${baseUrl}accounts/1/agents`, config);

// export const createNewAgent = async () =>
//   await axios.post(
//     `${baseUrl}accounts/1/agents`,
//     {
//       name: 'string',
//       email: 'string',
//       role: 'agent',
//       availability_status: 'available',
//       auto_offline: true,
//     },
//     config,

const baseUrlCLientAPI = 'https://chat.onexus.net/public/api/v1/inboxes/';
//https://app.chatwoot.com/public/api/v1/inboxes/{inbox_identifier}/contacts
export const CreateAContact = async () =>
  await axios.post(`https://chat.onexus.net/public/api/v1/inboxes/kK9XTrGgoMEJxWyfyJFHG2YT/contacts`, {
    identifier: '0844986650',
    name: 'Mr bunsbof',
  });
//https://app.chatwoot.com/public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}
export const GetAContact = async () =>
  await axios.get(`${baseUrlCLientAPI}3/contacts/{contact_identifier}`, config);

export const UpdateAContact = async () =>
  await axios.put(`${baseUrlCLientAPI}3/contacts/{contact_identifier}`, config);

//Conversations API

//https://app.chatwoot.com/public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations

export const CreateAConversation = async () =>
  await axios.post(`${baseUrlCLientAPI}3/contacts/1/conversations`, config);
//https://app.chatwoot.com/public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations
export const GetAllListConversations = async () =>
  await axios.get(`${baseUrlCLientAPI}3/contacts/1/conversations`, config);

// Message API
//https://app.chatwoot.com/public/api/v1/inboxes/{inbox_identifier}/contacts/{contact_identifier}/conversations/{conversation_id}/messages
export const CreateAMessage = async (data) =>
  await axios.post(
    `https://chat.onexus.net/public/api/v1/inboxes/kK9XTrGgoMEJxWyfyJFHG2YT/contacts/26e64d84-70b3-480f-9d15-b6cda8135b3d/conversations/5/messages`,
    { content: data, echo_id: 'string' },

  );


export const updateAgentInAccount = async () =>
  await axios.patch(
    `${baseUrl}accounts/1/agents/1`,
    {
      role: 'agent',
      availability: 'available',
      auto_offline: true,
    },
    config,
  );

export const removeAgentFromAccount = async () =>
  await axios.delete(`${baseUrl}accounts/1/agents/1`, config);

export const listCanned = async () =>
  await axios.get(`${baseUrl}accounts/1/canned_responses`, config);

export const addNewCanned = async () =>
  await axios.post(
    `${baseUrl}accounts/1/canned_responses`,
    {
      content: 'string',
      short_code: 'string',
    },
    config,
  );

export const removeCanned = async () => await axios.delete(`${baseUrl}accounts/1/canned_responses/1`, config)


export const createAgent = async (data) => await axios.post(`${baseURLPlatform}users`, data, configAgent)

export const getListAgent = async () => await axios.get('https://chat.onexus.net/api/v1/accounts/1/agents', config)
// export const createAgent = async () => await axios.post('https://chat.onexus.net/api/v1/accounts/1/agents', config)
export const setAgent = async (data) => await axios.post(`https://chat.onexus.net/platform/api/v1/accounts/1/account_users`, {
  user_id: data.user_id,
  role: data.role
}, configAgent)

export const removeAgent = async (id) => await axios.delete(`https://chat.onexus.net/api/v1/accounts/1/agents/${id}`, config)

//https://app.chatwoot.com/api/v1/accounts/{account_id}/agents/{id}
// https://app.chatwoot.com/api/v1/accounts/{account_id}/agents
//export const createAccount = async () =>
// await axios.post(`${baseUrl}accounts/1/agents`, data, config);
export const GetAllMessages = async () =>
  await axios.get(`${baseUrlCLientAPI}3/contacts/1/conversations/1/messages`, config);

