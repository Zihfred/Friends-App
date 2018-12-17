class FriendApp {
    constructor(){
        this.sortBox = document.querySelector('.sortBox');
        this.peoples = document.querySelector('.peoples');
        this.resetBtn = document.querySelector('.sortBox__resetBtn');
        this.sortInput = document.querySelector('.sortBox__sortedInput');
        this.data = [];
        this.startData = [];
        this.init();

        this.resetPeople = this.resetPeople.bind(this);
        this.sort = this.sort.bind(this);
        this.sortByInput = this.sortByInput.bind(this);
        this.addEventsListeners();
    }
    init(){
        //this.addCardToPeoples(this.generateOnePeopleCard());
        fetch('https://randomuser.me/api/?results=100',{
            method: "GET"
        })
            .then(res => {

                return res.json();
            })
            .then(res => {
                this.startData = res.results;
                this.data = res.results;
                this.generatePeoples(this.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    generatePeoples(data){

        data.forEach(onePeople => {
            this.addCardToPeoples(this.generateOnePeopleCard(onePeople));
        })
    }

    makeFirstLetterUpper(str) {
        return str[0].toUpperCase() + str.slice(1);
    }


    resetPeople(){
        this.sortInput.value = '';
        this.clearPeoplesForm();
        this.data = this.startData;
        this.generatePeoples(this.data);
    }


    generateOnePeopleCard(obj){
        let onePeople = document.createElement('div');
        onePeople.classList.add('onePeople');

        let avatar = document.createElement(('div'));
        avatar.classList.add('onePeople__avatar');

        let avatarImg = document.createElement('img');
        avatarImg.classList.add('onePeople__avatarImage');
        avatarImg.setAttribute('src', obj.picture.large);
        avatar.appendChild(avatarImg);

        let fullName = document.createElement('div');
        fullName.classList.add('onePeople__fullName');
        fullName.classList.add('onePeople__description');
        fullName.textContent = `${this.makeFirstLetterUpper(obj.name.first)} ${this.makeFirstLetterUpper(obj.name.last)}`;

        let location = document.createElement('div');
        location.classList.add('onePeople__description');
        location.classList.add('onePeople__location');
        location.textContent = `${this.makeFirstLetterUpper(obj.location.city)}`;

        let number = document.createElement('div');
        number.classList.add('onePeople__number');
        number.classList.add('onePeople__description');
        number.textContent = `Моб: ${(obj.cell)}`;

        let age = document.createElement('div');
        age.classList.add('onePeople__description');
        age.classList.add('onePeople__age');
        age.textContent = `Возраст: ${(obj.dob.age)}`;

        onePeople.appendChild(avatar);
        onePeople.appendChild(fullName);
        onePeople.appendChild(location);
        onePeople.appendChild(age);
        onePeople.appendChild(number);

        return onePeople;
    }

    addCardToPeoples(card){
        this.peoples.appendChild(card);
    }

    clearPeoplesForm(){
        this.peoples.innerHTML = '';
    }



    sort(e){
        if(e.target.classList.contains('fas')){
            switch (e.target.dataset.type) {
                case "ageUp":

                    this.clearPeoplesForm();
                    console.log(this.data);
                    this.generatePeoples(this.data.sort(function(a, b) {
                        console.log()
                        return a.dob.age - b.dob.age;
                    }));


                    break;
                case "ageDown":

                    this.clearPeoplesForm();
                    console.log(this.data);
                    this.generatePeoples(this.data.sort(function(a, b) {
                        console.log()
                        return b.dob.age - a.dob.age;
                    }));

                    break;
                case "nameDown":

                    this.clearPeoplesForm();
                    this.generatePeoples(
                    this.data.sort(function(a, b){
                        if(a.name.first < b.name.first) { return -1; }
                        if(a.name.first > b.name.first) { return 1; }
                        return 0;
                    }))




                    break;
                case "nameUp":

                    this.clearPeoplesForm();
                    this.generatePeoples(
                        this.data.sort(function(a, b){
                            if(a.name.first < b.name.first) { return 1; }
                            if(a.name.first > b.name.first) { return -1; }
                            return 0;
                        }))

                    break;
                case "male":
                    this.data = this.startData;
                    this.clearPeoplesForm();
                    this.data =  this.data.filter(function (people) {
                        return people.gender === 'male';
                    })
                    this.generatePeoples(this.data);


                    break;
                case "female":
                    this.data = this.startData;
                    this.clearPeoplesForm();
                    this.data = this.data.filter(function (people) {
                        return people.gender === 'female';
                    });
                    this.generatePeoples( this.data);

                    break;

            }
        }
    }

    sortByInput() {
        this.data = this.startData;
        if (!this.sortInput.value) {
            this.clearPeoplesForm();
            this.generatePeoples(this.data);
        } else {
            this.clearPeoplesForm();
            let inputValue = this.sortInput.value;
            this.clearPeoplesForm();
            this.data = this.data.filter(function (people) {
                console.log(people.name.first);
                return people.name.first.indexOf(inputValue) != -1 || people.name.last.indexOf(inputValue) != -1;
            });
            this.generatePeoples(this.data);

        }
        console.log(this.data);
    }


    addEventsListeners(){
        this.sortBox.addEventListener('click',this.sort);
        this.resetBtn.addEventListener('click',this.resetPeople);
        this.sortInput.addEventListener('input',this.sortByInput)
    };


}

new FriendApp();