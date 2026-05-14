let currentVM = null;
    }else{
        frame.style.filter = 'none';
    }
}

function renderSessions(){

    sessionsDiv.innerHTML = '';

    sessions.forEach((session,index) => {

        const card = document.createElement('div');

        card.className = 'sessionCard';

        card.innerHTML = `
            <div>${session.container_id}</div>
            <small>${session.connect_code}</small>
        `;

        card.onclick = () => {
            currentVM = session;
            frame.src = session.url;
            statusText.innerText = 'Connected';
        };

        sessionsDiv.appendChild(card);
    });
}

window.addEventListener('keydown',(e)=>{

    if(e.ctrlKey && e.key === 'f'){
        e.preventDefault();
        toggleFullscreen();
    }

    if(e.ctrlKey && e.key === 'r'){
        e.preventDefault();
        reconnectVM();
    }
});

frame.onload = () => {
    hideLoader();
};

setInterval(()=>{

    if(currentVM && frame.src === ''){
        reconnectVM();
    }

},5000);

const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change',(e)=>{

    const file = e.target.files[0];

    if(file){
        alert(`Selected: ${file.name}`);
    }
});
