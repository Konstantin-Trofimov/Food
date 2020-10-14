import {
    openModal,
    closeModal
} from './modal';

import {
    postData
} from '../sevices/services';

function forms(formSelector, modalTimerId) {

    //* Forms ************************************************************************

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };



    forms.forEach(item => {
        bindPostData(item);
    });

    //? Фн сабмитит данные с формы на сервер, приобразуя в JSON формат.
    //? Фн изменяет вид модального окна в зависимости от статуса отправки формы.

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            //! собираем данные из формы в обьект FormData.

            const formData = new FormData(form);

            //! Перегоняем FormData в Object.

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            //! Отправляем данные на сервер.

            postData('http://localhost:3000/requests', JSON.stringify(object)) //! JSON -> Object
                // .then(data => data.text)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();

                }).catch(() => {
                    showThanksModal(message.failure);

                }).finally(() => {
                    form.reset();

                });
        });
    }

    //? Фн изменяет модальное окно после отпавки формы.

    function showThanksModal(message) {
        //! Получаем содержанее модального окна (форму).

        const prewModalDialog = document.querySelector('.modal__dialog');

        prewModalDialog.classList.add('hide'); //! Скрываем.
        openModal('.modal', modalTimerId); //! Открываем модалку.

        //! Создаем новое содержание модального окна.

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); //! Помещаем на страницу.
        setTimeout(() => {
            thanksModal.remove(); //! Удаляем спустя 4 секунды. 

            //! Возвращаем прежний внешний вид окна.

            prewModalDialog.classList.add('show');
            prewModalDialog.classList.remove('hide');

            closeModal('.modal'); //! Зкрываем окно.
        }, 4000);
    }
}

export default forms;