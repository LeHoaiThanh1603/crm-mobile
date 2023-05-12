import Sidebar from "./Sidebar/Sidebar";
import ContentChat from './ContentChat/ContentChat'

import './Chat.css'
function Chat() {
    return (
        <div className="chat">
            <Sidebar />
            <ContentChat />
        </div>
    );
}

export default Chat;