export class charactersSearch{
  static search(id){
    const endpoint = `https://www.breakingbadapi.com/api/characters/${id}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(data => data[0])
    .then(({ char_id ,name, birthday, img, nickname }) => ({
      char_id,
      name,
      birthday,
      img,
      nickname,
    }))
  }
}