console.log('Jag körs när DOM har laddats i webbläsaren');

const sendRequestButton = document.querySelector('#sendRequestButton')
const resultParagraph = document.querySelector('#resultParagraph')
const factList = document.querySelector('#factList')
const animalImg = document.querySelector('#animalImg')

const state = {
	facts: [
		{
			title: 'Gorillas can catch human colds and other illnesses.',
			img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg/800px-Gorille_des_plaines_de_l%27ouest_%C3%A0_l%27Espace_Zoologique.jpg',
			attribution: 'By Thurundir - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=84810598'
		},
		{
			title: 'A newborn Chinese water deer is so small it can almost be held in the palm of the hand.',
			img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Hydropotes_inermis_male.JPG/1024px-Hydropotes_inermis_male.JPG',
			attribution: 'By Altaileopard - Own work, Public Domain, https://commons.wikimedia.org/w/index.php?curid=15811909'
		},
		{
			title: 'Ostriches can run faster than horses, and the males can roar like lions.',
			img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Struthio_Diversity.jpg/1920px-Struthio_Diversity.jpg',
			attribution: 'By PaleoNeolitic (montage creator)Diego Delsoninara - Wikimedia Commons, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=102322166'
		},
		{
			title: 'A lion in the wild usually makes no more than twenty kills a year.',
			img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1024px-Lion_waiting_in_Namibia.jpg',
			attribution: 'By Kevin Pluck - Flickr: The King., CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=755560'
		},
	]
}


renderFacts()


function renderFacts() {
	state.facts.forEach(fact => {
		let container = document.createElement('div')
		let h3 = document.createElement('h3')
		let button = document.createElement('button')
		let p = document.createElement('p')

		h3.innerText = fact.title
		button.innerText = 'Show image'
		p.innerText = fact.attribution

		button.addEventListener('click', () => {
			animalImg.src = fact.img
		})

		container.appendChild(h3)
		container.appendChild(button)
		container.appendChild(p)
		factList.appendChild(container)
	})
}

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