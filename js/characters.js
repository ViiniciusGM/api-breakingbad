import { charactersSearch } from "./charactersSearch.js" 

export class characters {
  constructor(root){
    this.root = document.querySelector(root) // ROOT = INDEX.HTML#APP
    this.load()

    this.tbody = this.root.querySelector('tbody')
  }

  async add(serieName) {
    try{   
      const character = await charactersSearch.search(serieName)
      
      if(character.name === undefined){
        throw new Error("O ID Não existe!")
        }

        this.entries = [character, ...this.entries]
        this.update()
        this.save()

      } catch(e){
        alert(e.message)
      } 
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@charactersBreakingBad:')) || []
  }
  
  save(){
    localStorage.setItem('@charactersBreakingBad:', JSON.stringify(this.entries))

  }

  delete(user){
    const filteredEntried = this.entries 
    .filter(entry => entry.name !== user.name)
    this.entries = filteredEntried
    this.update()
    this.save()
  }
}

export class charactersView extends characters{
  constructor(root){
    super(root)

    this.removeAll()
    this.update() 
    this.onadd()
  }

  onadd(){
    const addButon = this.root.querySelector('.search button')
    addButon.addEventListener('click', () => {
      const { value } = this.root.querySelector('.search input')

      this.add(value)
    })
  }

  update(){
    this.removeAll()
    
    this.entries.forEach( user => {
      const row = this.create()

      row.querySelector('.personagem img').src = user.img
      row.querySelector('.name span').innerHTML = user.name
      row.querySelector('.birthday span').innerHTML = user.birthday
      row.querySelector('.nickname span').innerHTML = user.nickname
      
      const buttonRemove = row.querySelector('.removed button')
      buttonRemove.addEventListener('click', () => {
        const okRemove = confirm('Você realmente deseja deletar essa linha?')

          if(okRemove){
            this.delete(user)
          }
      })
      this.tbody.append(row)
    })
  }


  create(){
    const tr = document.createElement('tr')

    tr.innerHTML =`
            <td class="personagem">
              <img src="https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg" alt="">
            </td>

            <td class="name">
              <span>Walter White</span>
            </td>

            <td class="birthday">
              <span>09-07-1958</span>
            </td>

            <td class="nickname">
              <span>Heisenberg</span>
            </td>

            <td class="removed">
              <button class="remove">Excluir</button>
            </td>
    `

    return tr
  }

  removeAll(){
    

    this.tbody.querySelectorAll('tr')
    .forEach((tr) => {
      tr.remove() // Para cada TR executa o .remove()
    })
  }
}