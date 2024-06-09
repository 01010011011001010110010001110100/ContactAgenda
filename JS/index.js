var cardBodyContacts = document.getElementById('card-body-contacts');
var tableContacts = document.getElementById('table-contacts');
var formAddContact = document.getElementById('form-add-contact');

//#region Get and Load Contacts

function GetContacts(){
    fetch('http://www.raydelto.org/agenda.php')
    .then(result => result.json())
    .then(data => LoadContactsInTable(data))
    .catch(error => {
        var message = document.createElement('h4');

        message.textContent = 'There was a problem loading contacts';
        message.className = 'text-error';

        cardBodyContacts.appendChild(message);
        console.log(error);
    });
}

function LoadContactsInTable(contacts){
    var iterator = 0;

    contacts.forEach(element => {
        var row = document.createElement('tr');
        var id = document.createElement('td');
        var name = document.createElement('td');
        var lastName = document.createElement('td');
        var phoneNumber = document.createElement('td');

        iterator++;
        id.textContent = '#' + iterator;
        name.textContent = element.nombre;
        lastName.textContent = element.apellido;
        phoneNumber.textContent = element.telefono;

        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(lastName);
        row.appendChild(phoneNumber);

        tableContacts.appendChild(row);
    });
}

//#endregion

//#region Add contact

function AddContact(contact){
    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        body: JSON.stringify(contact)
    })
    .then(() => location.reload())
    .catch(error => {
        alert('There was a problem loading contacts');
        console.log(error);
    });
}


formAddContact.addEventListener('submit',(event) => {
    event.preventDefault();

    var name = document.getElementById('InputName').value;
    var lastName = document.getElementById('InputLastName').value;
    var phoneNumber = document.getElementById('InputPhoneNumber').value;

    AddContact({
        nombre: name,
        apellido: lastName,
        telefono: phoneNumber
    });
});

//#endregion

//Get all the contancs when the script load
GetContacts();