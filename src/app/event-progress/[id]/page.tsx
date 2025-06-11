// app/event-progress/page.tsx
"use client"
import { ErrorBox, FileUploadUI, LoadingBox } from '@/components';
import { useEventProgress } from '@/hooks/useEventProgress';
import { useSessionRedirect } from '@/hooks/useSessionRedirect';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBan } from 'react-icons/fa';

const EventProgressPage = () => {

    const { session, status } = useSessionRedirect();
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter()

    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const { data: eventInfo, isLoading, isError, error } = useEventProgress(Number(id))

    const [isJoined, setIsJoined] = useState(false)

    if(status === "unauthenticated"){
      return <LoadingBox message="Redirecting to signin..."/>
    }

    if(isLoading){
      return <LoadingBox message={`Fetching event ${id} details...`}/>
    }

    if(isError){
      return <ErrorBox error={error as any}/>
    }

    const handleVerificationChange = async (participant: any, newValue: boolean) => {
      try {
        await fetch('/api/event-participant/verify', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_id: eventInfo?.id,
            user_id: participant.user_id,
            is_verified: newValue ? 'verified' : 'unverified',
          }),
        });

        participant.is_verified = newValue ? 'verified' : 'unverified';
        setIsJoined((prev) => !prev)
      } catch (err) {
        console.error('Verification update failed:', err);
        alert('Failed to update verification status.');
      }
    };

    const handleUploadProof = async () => {
      if (!files || files.length === 0) {
        alert('Please select a file first.');
        return;
      }

      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('event_id', eventInfo?.id)
      formData.append('user_id', String(session?.user.id))

      try {
        const res = await fetch('/api/event-participant/proof', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();

        if (res.ok) {
          alert('Proof uploaded successfully!');
          console.log('Saved URL:', result.proof_url);
        } else {
          alert('Upload failed: ' + result.error);
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong.');
      }
    };

    const handleFinalizeEvent = async () => {
      const confirmed = confirm("Are you sure you want to finalize the event? Verified participants will receive points.");
      if (!confirmed) return;

      try {
        const res = await fetch('/api/event/finalize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_id: eventInfo?.id,
            points: eventInfo?.final_points
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.error || 'Failed to finalize event');
          return;
        }

        alert('Event finalized and points granted to verified participants!');
        router.push('/events')
      } catch (err) {
        console.error(err);
        alert('An error occurred while finalizing the event.');
      }
    };

  return (
    <div className="mx-auto p-4 h-full">
      <div className="flex flex-col md:flex-row gap-8 h-full">

        <div className="md:w-1/2 space-y-2">
          <h2 className="text-2xl font-bold">{eventInfo?.name}</h2>
          <p><span className="font-semibold">Location:</span> {eventInfo?.location}</p>
          <p><span className="font-semibold">Points:</span> {eventInfo?.final_points ?? 'N/A'}</p>
          <p><span className="font-semibold">Start Time:</span> {eventInfo?.start_datetime ?? 'N/A'}</p>
          <p><span className="font-semibold">Description:</span></p>
          <p><span >{eventInfo?.description ?? 'None'}</span></p>

          <div className="flex flex-1 flex-col gap-2">
            <p className="font-semibold">Proof of Contribution</p>
            <FileUploadUI files={files} setFiles={setFiles}/>
            {eventInfo?.status !== "Finalized" &&
            <button
              onClick={handleUploadProof}
              className={`mt-2  text-white px-4 py-2 rounded transition 
                ${eventInfo?.status === "Finalized" ? "bg-red-500" : "bg-blue-600 hover:bg-blue-700 "}`}
              disabled={eventInfo?.status === "Finalized"}>
              Upload Proof
            </button>}
          </div>
        </div>

        <div className="w-[1px] bg-gray-200 mx-4"/>


        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold mb-2">Participants</h3>
          <ul className="space-y-3">
            {eventInfo?.EventParticipants && eventInfo?.EventParticipants.map((p : any) => (
              <li
                key={p.user_id}
                className="flex items-center gap-4 p-3 border rounded-lg shadow-sm "
              >
                <img
                  src={p.User?.img_url || '/default-avatar.png'}
                  alt={p.User?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{p.User?.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{p.status}</p>
                </div>

                {(p?.proof_url) ? <img src={p.proof_url} className="h-12 ml-auto"/> : <FaBan className="h-10 w-10 ml-auto"/>}

              {eventInfo?.EventParticipants?.find((p: any) => p.status === "leader")?.user_id === session?.user?.id && (
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 mx-4"
                  checked={p.is_verified === 'verified'}
                  onChange={(e) => handleVerificationChange(p, e.target.checked)}
                  disabled={eventInfo?.status === "Finalized"}
                />
              )}
              </li>
            ))}
          </ul>

          {eventInfo?.status !== "Finalized" && eventInfo?.EventParticipants?.find((p: any) => p.status === "leader")?.user_id === session?.user?.id && (
            <div className="mt-6">
              <button
                onClick={handleFinalizeEvent}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Finalize Event & Grant Points
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default EventProgressPage;
