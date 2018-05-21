import $ from 'jquery'
import request from 'superagent'

$(document).ready(function () {
  function getAndSetValue () {
    const searchArray = $('#search').val().split(' ')
    const search = searchArray.join('+')

    request
      .get(`https://itunes.apple.com/search?term=${search}&media=music`)
      .then(response => {
        let parsedResponse = JSON.parse(response.text)
        let parsedArray = parsedResponse.results
        $('.music').html('')
        for (var i = 0; i < parsedArray.length; i++) {
          // console.log(parsedArray[i])
          $('.results').html('Search Results:')
          $('.music').append(`
            <div class="track" data-preview="${parsedArray[i].previewUrl}">
              <img class="track__img" src="${parsedArray[i].artworkUrl100}">
              <h6 class="track__name">${parsedArray[i].trackName}</h6>
              <h6 class="track__artist">${parsedArray[i].artistName}</h6>
            </div>
          `)
        }
      })
  }

  $(document).on('click', '.track', function (event) {
    $('.audio').html('')
    $('.audio').html(`
      <source src="${event.currentTarget.dataset.preview}">
    `).trigger('load').trigger('play')

    $('.playing').html('')
    $('.playing').append(`Now Playing: ${event.currentTarget.children[1].innerText} - ${event.currentTarget.children[2].innerText}`)
  })

  $(document).on('submit', '#search-music', function (event) {
    event.preventDefault()
    getAndSetValue()
  })
})
