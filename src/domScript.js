console.log('Jag körs när DOM har laddats i webbläsaren');

const sendRequestButton = document.querySelector('#sendRequestButton')
const resultParagraph = document.querySelector('#resultParagraph')

sendRequestButton.addEventListener('click', async () => {
	let text = ''
	try {
		const response = await fetch('https://forverkliga.se/JavaScript/api/simple.php?key=value')
		text = await response.text()
		data = JSON.parse(text)
		addMessage('Got data from API. The clock is: ' + data.time)

	} catch(error) {
		if( text !== '' ) {
			addMessage(text)
		} else {
			addMessage('Failed to fetch data from API.', error.message)
		}
	}
	
})

function addMessage(message, error) {
	if( error ) {
		resultParagraph.innerHTML = message + '<br>'
				+ error + '<br><br>' + resultParagraph.innerHTML
	} else {
		resultParagraph.innerHTML = message + '<br><br>' + resultParagraph.innerHTML
	}
}