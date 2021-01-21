$.getJSON('data.json', function(data) {

    console.log(data.resume);

    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);
    generateMainInfo(wrapper, data);
    generateSections(wrapper, data);
    createButton(wrapper, data);
})

function generateMainInfo(wrapper, data) {
    const resume = data.resume;
    const main_info = document.createElement('div');
    main_info.classList.add('main_info');
    wrapper.appendChild(main_info);

    const photo = document.createElement('img');
    photo.classList.add('main_info__img');
    photo.src = resume.image;
    main_info.append(photo);

    const name = document.createElement('div');
    name.classList.add('main_info__name');
    let textbuffer = document.createElement('span');
    textbuffer.innerText = resume.fullname;
    name.append(textbuffer);
    main_info.append(name);

    const position = document.createElement('div');
    position.classList.add('main_info__position');
    textbuffer = document.createElement('span');
    textbuffer.innerText = resume.position.toUpperCase();
    position.append(textbuffer);
    main_info.append(position);

    const age = document.createElement('div');
    age.classList.add('main_info__age');
    textbuffer = document.createElement('span');
    textbuffer.innerText = `${resume.age} y.o.`;
    age.append(textbuffer);
    main_info.append(age);

    const phone = document.createElement('div');
    let iconbuffer = document.createElement('i');
    iconbuffer.classList.add('icon-phone');
    phone.classList.add('main_info__phone');
    textbuffer = document.createElement('div');
    textbuffer.style.margin = "3px 0 0 0";
    textbuffer.innerText = resume.phone;
    phone.append(iconbuffer);
    phone.append(textbuffer);
    main_info.append(phone);

    const mail = document.createElement('div');
    iconbuffer = document.createElement('i');
    iconbuffer.classList.add('icon-mail');
    mail.classList.add('main_info__mail');
    textbuffer = document.createElement('div');
    textbuffer.style.margin = "3px 0 0 0";
    textbuffer.innerText = resume.email;
    mail.append(iconbuffer);
    mail.append(textbuffer);
    main_info.append(mail);
}

function generateSections(wrapper, data) {
    const resume = data.resume;
    if (resume.sections.length === 0) return 0;
    let section, content, title, subtitle, date, from, to, item, textbuffer;
    for (let i of resume.sections) {
        section = document.createElement('div');
        section.classList.add('section');
        textbuffer = document.createElement('span');
        textbuffer.innerText = i.title.toUpperCase();
        section.append(textbuffer);
        wrapper.appendChild(section);
        content = document.createElement('div');
        content.classList.add('content');
        for (let j of i.items) {
            if (j.title !== '') {
                title = document.createElement('div');
                title.classList.add('content__title');
                textbuffer = document.createElement('span');
                textbuffer.innerHTML = j.title;
                title.append(textbuffer);
                content.appendChild(title);
            }
            if (j.subTitle !== '') {
                subtitle = document.createElement('div');
                subtitle.classList.add('content__subtitle');
                textbuffer = document.createElement('span');
                textbuffer.innerHTML = j.subTitle;
                subtitle.append(textbuffer);
                content.appendChild(subtitle);
            }
            if (j.from !== '' || j.to !== '') {
                date = document.createElement('div');
                date.classList.add('content__date');
                if (j.from !== '') {
                    from = document.createElement('span');
                    from.innerHTML = j.from + ' - ';
                    date.append(from);
                } else {
                    from = document.createElement('span');
                    from.innerHTML = '... - ';
                    date.append(from);
                }
                if (j.to !== '') {
                    to = document.createElement('span');
                    to.innerHTML = j.to;
                    date.append(to);
                } else {
                    to = document.createElement('span');
                    to.innerHTML = '...';
                    date.append(to);
                }
                content.appendChild(date);
            }
            for (let y of j.items) {
                item = document.createElement('div');
                item.classList.add('content__item');
                textbuffer = document.createElement('span');
                textbuffer.innerHTML = y;
                item.append(textbuffer);
                content.appendChild(item);
            }

        }
        wrapper.appendChild(content);
        section.addEventListener('click', function() {
            this.classList.toggle('active');
            content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 100 + "px";
            }
        })
        if (i.isOpen) {
            section.click();
        }
    }
}

function createButton(wrapper, data) {
    const sex = data.resume.sex === 'male' ? 'Уважаемый' : 'Уважаемая'
    const day = new Date().getDate() < 10 ? '0' + new Date().getDate() : `${new Date().getDate()}`
    const month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : `${new Date().getMonth()+1}`
    const href = `mailto:${data.resume.email}?subject=Приглашение%20на%20собеседование&body=${sex}%20${data.resume.fullname},%20приглашаем%20Вас%20на%20собеседование%20в%20компанию%20Artezio.%0A${day}.${month}.${new Date().getFullYear()}`;
    const button = document.createElement('button');
    button.classList.add('send_button');
    const textbuffer = document.createElement('div');
    textbuffer.classList.add('send_button__text')
    textbuffer.innerText = 'Send';
    button.appendChild(textbuffer)
    wrapper.appendChild(button);
    button.onclick = function() { window.open(href) };
}