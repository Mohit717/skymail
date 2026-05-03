import toast from "react-hot-toast";
const toastStyle = {
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
    },
}

// Random function to get random item from an array
const cardClasses = ['card-tale', 'card-dark-blue', 'card-light-blue', 'card-light-danger']
export function getRandomCard(): string {
    const randomIndex = Math.floor(Math.random() * cardClasses.length);
    return cardClasses[randomIndex];
}

export const toastError = (message: string) => {
    toast.error(message, toastStyle)
}

export const toastSuccess = (message: string) => {
    toast.success(message, toastStyle)
}

export const dateFormatter = (date: string) => {
    const inputDate = new Date(date);
    const today = new Date();
    
    const isToday = 
        inputDate.getFullYear() === today.getFullYear() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getDate() === today.getDate();
    
    if (isToday) {
        return inputDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    } else {
        return inputDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }
}