import { useBookingStore } from "../store/bookingStore";

interface RoomSelectionProps {
  onContinue: () => void;
}

function RoomSelection({
  onContinue
}: RoomSelectionProps) {
  const room = useBookingStore(
    (state) => state.selectedRoom
  );

  if (!room) {
    return null;
  }

  return (
    <div className="room-selection">
      <div className="selected-room-box">
        <span>Selected Room</span>

        <h3>{room.type}</h3>

        <p>
          Room {room.roomNumber}
        </p>

        <strong>
          ₹{room.price.toLocaleString()}
          /night
        </strong>
      </div>

      <button
        className="primary-button"
        onClick={onContinue}
      >
        Continue →
      </button>
    </div>
  );
}

export default RoomSelection;