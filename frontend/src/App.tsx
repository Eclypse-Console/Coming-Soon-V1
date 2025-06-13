import { useState } from 'react'
import './App.css'
import { trpc } from './lib/trpc/index';

function App() {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const mutation = trpc.newsletter.addUser.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await mutation.mutateAsync({ email });
      console.log('User added:', response);
      alert("Done..✅")
    } catch (err) {
      console.error('Error adding user:', err);
      alert("Error aa gya")
    } finally {
      setLoading(false);
      setEmail('');
    }
  };


  return (
    <div className='bg-black flex items-center justify-center h-screen w-full'>


      <form onSubmit={handleSubmit} className="p-4 bg-[#111] border border-[#222] rounded-lg flex flex-col items-center justify-center gap-2
      ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button disabled={loading || email.length === 0} type="submit">
          {!loading ? 'Subscribe' : 'Loading...'}
        </button>
      </form>
    </div >
  )
}

export default App
