import React from 'react';
import { Link } from 'react-router-dom';

const ChatMessage = ({ userId, content }) => {
    return (
        <div className="post">
            <p className="post-content">
                <Link to={`/profile/${userId}`} style={{ fontWeight: 'bold' }}>
                    {userId}
                </Link>: {content}
            </p>
        </div>
    );
};

export default ChatMessage;