import React, { useState, useEffect, useRef } from 'react';
import { Send, Users, Plus, MessageCircle, Settings, Flag, Ban, UserX, ThumbsUp, ThumbsDown, Smile, Search, Gamepad2 } from 'lucide-react';

const RailTalkDemo = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([
    { id: 'A1-12345', name: 'Coach A1 - Express 12345', members: 15, coach: 'A1', train: '12345' },
    { id: 'B2-12345', name: 'Coach B2 - Express 12345', members: 8, coach: 'B2', train: '12345' },
    { id: 'S1-12346', name: 'Coach S1 - Rajdhani 12346', members: 22, coach: 'S1', train: '12346' }
  ]);
  const [messages, setMessages] = useState([]);

  const [polls, setPolls] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', ticket: '', train: '' });
  const [roomForm, setRoomForm] = useState({ trainNumber: '', coachNumber: '' });
  const messagesEndRef = useRef(null);
const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    ticket: '',
    train: ''
  });

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Enter your name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Number</label>
        <input 
          type="text" 
          value={formData.ticket}
          onChange={(e) => setFormData(prev => ({ ...prev, ticket: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="e.g., 1234567890"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Train Number</label>
        <input 
          type="text" 
          value={formData.train}
          onChange={(e) => setFormData(prev => ({ ...prev, train: e.target.value }))}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="e.g., 12345"
        />
      </div>
      
      <button 
        onClick={() => {
          if (formData.name && formData.ticket && formData.train) {
            onLogin(formData);
          }
        }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
      >
        Join RailTalk 🚀
      </button>
    </div>
  );
};



  const avatars = ['🚂', '🎒', '☕', '📱', '🎵', '📚', '🍿', '🎮', '🌟', '🎭', '🦋', '🌈', '🚀', '⭐', '🎨'];
  const adjectives = ['Wandering', 'Happy', 'Curious', 'Friendly', 'Adventurous', 'Cheerful', 'Peaceful', 'Energetic'];
  const nouns = ['Traveler', 'Explorer', 'Passenger', 'Wanderer', 'Journeyer', 'Voyager', 'Navigator', 'Commuter'];

  const generateAvatar = () => {
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 9999);
    return `${adj}${noun}${num}${avatar}`;
  };

  useEffect(() => {
    if (currentScreen === 'chat' && currentRoom) {
      // Simulate existing messages in the room
      const existingMessages = [
        { id: 1, user: 'WanderingExplorer123🚂', message: 'Hey everyone! Just boarded from Delhi. How\'s the journey so far?', timestamp: '10:30 AM', type: 'message' },
        { id: 2, user: 'CuriousTraveler456☕', message: 'Pretty smooth! The pantry car has amazing chai today 👌', timestamp: '10:32 AM', type: 'message' },
        { id: 3, user: 'HappyVoyager789🎒', message: 'Anyone know what time we reach Agra?', timestamp: '10:35 AM', type: 'message' },
        { id: 4, user: 'WanderingExplorer123🚂', message: 'Should be around 2:30 PM if we\'re on time', timestamp: '10:36 AM', type: 'message' }
      ];
      setMessages(existingMessages);
    }
  }, [currentScreen, currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (userData) => {
    setUser({ ...userData, avatar: generateAvatar() });
    setCurrentScreen('rooms');
  };

  const joinRoom = (room) => {
    setCurrentRoom(room);
    setCurrentScreen('chat');
  };

  const createRoom = (trainNumber, coachNumber) => {
    const roomId = `${coachNumber}-${trainNumber}`;
    const existingRoom = rooms.find(r => r.id === roomId);
    
    if (existingRoom) {
      alert('A room for this coach already exists!');
      joinRoom(existingRoom);
      return;
    }

    const newRoom = {
      id: roomId,
      name: `Coach ${coachNumber} - Express ${trainNumber}`,
      members: 1,
      coach: coachNumber,
      train: trainNumber
    };
    
    setRooms([...rooms, newRoom]);
    joinRoom(newRoom);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: user.avatar,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'message',
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const createPoll = () => {
    const pollQuestion = prompt('Enter poll question:');
    if (pollQuestion) {
      const poll = {
        id: Date.now(),
        question: pollQuestion,
        options: ['Yes', 'No'],
        votes: { 'Yes': 0, 'No': 0 },
        creator: user.avatar
      };
      setPolls([...polls, poll]);
      
      const pollMessage = {
        id: Date.now() + 1,
        user: user.avatar,
        message: `📊 Created a poll: "${pollQuestion}"`,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'poll',
        poll: poll,
        isOwn: true
      };
      setMessages([...messages, pollMessage]);
    }
  };

  const votePoll = (pollId, option) => {
    setMessages(messages.map(msg => {
      if (msg.type === 'poll' && msg.poll.id === pollId) {
        const updatedPoll = { ...msg.poll };
        updatedPoll.votes[option]++;
        return { ...msg, poll: updatedPoll };
      }
      return msg;
    }));
  };

const LoginScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🚂</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">RailTalk</h1>
        <p className="text-gray-600">Connect with fellow travelers</p>
      </div>

      {/* Login Form (uses internal state now) */}
      <div className="space-y-6">
        <LoginForm onLogin={handleLogin} />
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Anonymous • Temporary • Safe</p>
      </div>
    </div>
  </div>
);


 const RoomsScreen = () => {
  const [localRoomForm, setLocalRoomForm] = useState({
    trainNumber: user?.trainNumber || '',
    coachNumber: ''
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🚂</div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RailTalk</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.avatar}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Train: {user?.trainNumber}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Create Room Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Plus className="mr-2" size={20} />
            Create New Room
          </h2>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Train Number"
              value={localRoomForm.trainNumber}
              onChange={(e) =>
                setLocalRoomForm(prev => ({
                  ...prev,
                  trainNumber: e.target.value
                }))
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="text" 
              placeholder="Coach (e.g., A1, B2, S1)"
              value={localRoomForm.coachNumber}
              onChange={(e) =>
                setLocalRoomForm(prev => ({
                  ...prev,
                  coachNumber: e.target.value
                }))
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button 
              onClick={() => {
                if (localRoomForm.coachNumber && localRoomForm.trainNumber) {
                  createRoom(localRoomForm.trainNumber, localRoomForm.coachNumber);
                  setLocalRoomForm({
                    trainNumber: user?.trainNumber || '',
                    coachNumber: ''
                  });
                }
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold flex items-center">
              <MessageCircle className="mr-2" size={20} />
              Available Rooms
            </h2>
          </div>
          <div className="divide-y">
            {rooms.map(room => (
              <div key={room.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{room.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Users size={16} className="mr-1" />
                      {room.members} members online
                    </div>
                  </div>
                  <button 
                    onClick={() => joinRoom(room)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

 const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: user.avatar,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'message',
        isOwn: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentScreen('rooms')}
              className="text-blue-500 hover:text-blue-700"
            >
              ← Back
            </button>
            <div>
              <h1 className="font-semibold text-gray-800">{currentRoom?.name}</h1>
              <p className="text-sm text-gray-600">{currentRoom?.members} members</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={createPoll}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Create Poll"
            >
              📊
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Games"
            >
              <Gamepad2 size={20} />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'bg-blue-500 text-white' : 'bg-white'} rounded-2xl p-3 shadow-sm`}>
              {!msg.isOwn && (
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className="text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setShowUserMenu(showUserMenu === msg.user ? null : msg.user)}
                  >
                    {msg.user}
                  </div>
                  {showUserMenu === msg.user && (
                    <div className="absolute bg-white border rounded-lg shadow-lg p-2 mt-6 z-10">
                      <button className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded">
                        💬 Message Privately
                      </button>
                      <button className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-red-600">
                        🚫 Block
                      </button>
                      <button className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded text-red-600">
                        👢 Kick (Vote)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {msg.type === 'poll' ? (
                <div className="space-y-2">
                  <p className="font-medium">{msg.poll.question}</p>
                  <div className="space-y-1">
                    {Object.entries(msg.poll.votes).map(([option, votes]) => (
                      <button
                        key={option}
                        onClick={() => votePoll(msg.poll.id, option)}
                        className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <span>{option}</span>
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">{votes}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p>{msg.message}</p>
              )}

              <div className={`text-xs mt-2 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={() => alert('GIF feature coming soon!')}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Add GIF"
          >
            <Smile size={20} />
          </button>
          <button 
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};


  return (
    <div className="font-sans">
      {currentScreen === 'login' && <LoginScreen />}
      {currentScreen === 'rooms' && <RoomsScreen />}
      {currentScreen === 'chat' && <ChatScreen />}
    </div>
  );
};

export default RailTalkDemo;