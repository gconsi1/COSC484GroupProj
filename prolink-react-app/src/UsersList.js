import React, { useEffect, useState } from 'react';

const UsersList = ({ currentUser }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/users/${currentUser._id}`)
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(err => setError('Failed to fetch users'));
    }, [currentUser]);

    const handleAddFriend = (friendId) => {
        fetch('/api/add-friend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id, friendId })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // or handle this in a more sophisticated way
        })
        .catch(err => setError('Failed to add friend'));
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.email} <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;