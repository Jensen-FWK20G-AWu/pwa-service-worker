console.log('Jag körs när DOM har laddats i webbläsaren');

const sendRequestButton = document.querySelector('#sendRequestButton')
const resultParagraph = document.querySelector('#resultParagraph')

sendRequestButton.addEventListener('click', async () => {
	try {
		const response = await fetch('https://forverkliga.se/JavaScript/api/simple.php?key=value')
		const data = await response.json()
		resultParagraph.innerHTML = 'Got data from API. The clock is: ' + data.time
			+ '<br><br>' + resultParagraph.innerHTML

	} catch(error) {
		resultParagraph.innerHTML = 'Failed to fetch data from API.<br>'
			+ error.message + '<br><br>' + resultParagraph.innerHTML
	}
	
})