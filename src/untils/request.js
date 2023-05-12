import axios from 'axios'
// import { deleteAdCampaign } from './request';
// import { GetChatToken } from '@/untils/request';

const baseURL = "http://api.cm.onexus.net/api/"

// export const getListGroups = async () => {
//     return await axios.get(`${baseURL}Group/GetGroupInformation`)
// }

export const getListUsers = async () => {
    return await axios.get(`${baseURL}Group/GetAllCustomers`)
}
export const updateGroup = async (arr) => {
    return await axios.put(`${baseURL}Group/UpdateGroup`, {
        "id": arr.id,
        "GroupName": arr.groupName,
        "GroupDescription": arr.groupDesCription,
        "Method": arr.method,
        "MaKhach": arr.maKhach
    })
}

// export const getInfomationCustomer = async () =>{
//     await axios.get()
// }



export const removeCustomerInGroup = async (arr) => {
    await axios.delete(`${baseURL}Group/DeleteCustomerInGroup?maKhach=${arr.maKhach}&groupId=${arr.id}`)
}

export const addCustomerIntoGroup = async (arr) => {
    try {
        await axios.post(`${baseURL}Group/InsertCustomerInGroup`, {
            "CustomerId": arr.customerId,
            "GroupId": arr.groupId,
        })
    } catch (error) {
        console.log(error)
    }
}

export const findCustomerInGroupByProp = async (data) => {
    return await axios.post(`${baseURL}Group/FindCustomerInGroupByProp`, {
        AtributeCustomer: data.atributeCustomer,
        ExpressionCustomer: data.expressionCustomer,
        ValueCustomer: data.valueCustomer,
    });
};
export const getProperities = async () => {
    return await axios.get(`${baseURL}Group/GetAllProperities`);
};
export const insertProperities = async (data) => {
    return await axios.post(`${baseURL}Group/InsertProperities`, {
        AtributeCustomer: data.atributeCustomer,
        ExpressionCustomer: data.expressionCustomer,
        ValueCustomer: data.valueCustomer,
    });
};
export const deleteProperities = async (id) => {
    return await axios.delete(`${baseURL}Group/DeleteProperities?id=${id}`);
};

// export const deleteAdCampaign = async (id) => {
//     return await axios.delete(`${baseURL}Group/DeleteAdCampaignById?id=${id}`);
// await getListGroups()
// }
// export const createAdCampaign = async (arr) => {
//     try {
//         await axios.post(`${baseURL}Group/InsertAdCampaign`, {
//             "content": arr.content,
//             "time": arr.time,
//             "mode": arr.mode,
//             "groupName": arr.groupName
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }
export const getGroup = async (groupName) => {
    return await axios.get(`${baseURL}Group/GetGroup?groupName=${groupName}`)
}


export const updateAdCampaign = async (data) => {
    return await axios.put(`${baseURL}Group/UpdateAdCampaign`, {
        "id": data.id,
        "time": data.time,
        "groupIds": data.groupIds,
        "mode": data.mode,
        "content": data.content
    })
}

export const getListAdCampaign = async () => {
    return await axios.get('http://api.cm.onexus.net/api/CRM/ListCampaign')
}

export const createAdcampaign = async (dataCreate) => {
    try {
        await axios.post(`http://api.cm.onexus.net/api/CRM/SaveCampaign`, {
            "name": dataCreate.name,
            "template": dataCreate.template,
            "channel": dataCreate.channel,
            "group": dataCreate.group,
            "sendTime": dataCreate.sendTime,
            "sendNow": dataCreate.sendNow
        })
    } catch (error) {
        console.log(error)
    }
}

export const sendMuiltibleChannel = async (id) => {
    return await axios.get(`${baseURL}Group/SendMessageToMultipleChannel?id=${id}`)
}

export const insertRecord = async (record) => {
    return await axios.post(`${baseURL}Group/InsertRecord`, {
        "UserName": record.UserName,
        "CreatedTime": record.CreatedTime,
        "EditingTime": record.EditingTime,
        "RecordName": record.RecordName
    })
}

export const getListGroups = async (data) => {
    return await axios.get(`http://api.cm.onexus.net/api/Group/GetAll`)
}
// export const createGroup = async (formData) => {
//     try {
//       const response = await fetch('http://api.cm.onexus.net/api/Group/CreateGroup', {
//         method: 'POST',
//         body: formData
//       });
//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
export const deleteGroup = async (id) => {
    await axios.delete(`http://api.cm.onexus.net/api/Group/DeleteGroup?groupId=${id}`);
    // await getListGroups()
}


export const getGroupDetail = async (id) => {
    return await axios.get(`http://api.cm.onexus.net/api/Group/GetGroupDetail?groupId=${id}`)
}

export const GetIncomTemplate = async (data) => {
    return await axios.get(`http://api.cm.onexus.net/api/CRM/GetIncomTemplate?channel=${data.channel}`)
}
export const GetConversations = async () => {
    return await axios.get('http://api.cm.onexus.net/api/Chat/GetConversations')
}

export const GetMessage = async (id) => {
    return await axios.get(`http://api.cm.onexus.net/api/Chat/GetMessages?conversationId=${id}`)
}

export const SendMessager = async (data) => {
    return await axios.post(`http://api.cm.onexus.net/api/Chat/SendMessage?conversationId=${data.id}&message_content=${data.content}`)
}

export const GetGroupsALL = async () => {
    return await axios.get('http://api.cm.onexus.net/api/Group/GetAll')
}

export const DeleteMessager = async (data) => {
    return await axios.delete(`http://api.cm.onexus.net/api/Chat/DeleteMessage?conversationId=${data.conversitonId}&messageId=${data.messageId}`)
}

export const GetTemplateByChannelLanguage = async (data) => {
    return await axios.get(`http://api.cm.onexus.net/api/CRM/GetTemplateByChannelLanguage?channel=${data.channel}&language=${data.language}`)
}

export const deleteAdCampaign = async (id) => {
    return await axios.delete(`http://api.cm.onexus.net/api/CRM/DeleteCampaign?CampaignId=${id}`)
}


export const GetChatByToken = async () => {
    return await axios.get('http://api.cm.onexus.net/api/Chat/GetChatToken')
}

export const deleteTemplate = async (id) => {
    return await axios.delete(`http://api.cm.onexus.net/api/CRM/DeleteTemplate?templateId=${id}`)
}

export const createTemplateMessage = async (dataCreate) => {
    try {
        await axios.post(`http://api.cm.onexus.net/api/CRM/SaveCampaign`, {
            "name": dataCreate.name,
            "template": dataCreate.subject,
            "message": dataCreate.message,
            "channel": dataCreate.channel,
            "language": dataCreate.language,
            "incomTemplateCode": dataCreate.incomTemplateCode,
            "paramConfigs": dataCreate.paramConfigs
        })
    } catch (error) {
        console.log(error)
    }
}
export const Get = async () => {
    return await axios.get('http://api.cm.onexus.net/api/Chat/GetChatToken')
}
export const SendMessageAttachFiles = async (dataApi) => {
    return axios.post(`http://api.cm.onexus.net/api/Chat/SendMessageAttachFiles?conversationId=${dataApi.id}`, dataApi.data, {
        withCredentials: true,
        headers: '3KQNzcjHWjBZky688kR9J7w1'
    })
}

export const getAdcampaignDetail = async (idDetail) => {
    return await axios.get(`http://api.cm.onexus.net/api/CRM/CampaignDetail?campaignId=${idDetail}`)
}

export const Contact = async (contactID) => {
    return await axios.post(`http://api.cm.onexus.net/api/Chat/Contact?contactId=${contactID}`)
}

export const GetListRating = async () => {
    return await axios.get('http://api.cm.onexus.net/api/CRM/ListRating')
}

export const CreateRating = async (data) => {
    return await axios.post('http://api.cm.onexus.net/api/CRM/Rating', data, {
        withCredentials: true,
        headers: '3KQNzcjHWjBZky688kR9J7w1'
    })
}