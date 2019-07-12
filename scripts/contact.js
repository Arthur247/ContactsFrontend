$(function () {

    const contactPage = $("#contact"),
        contactListPage = $("#contact_list"),
        addNumberButton = $("#contact_add_phone_number"),
        form = $("#contact_form");

    // Back To Contact List
    contactPage.on('click', '#contact_back_btn', function () {

        contactListPage.show();
        contactPage.hide();
        resetContactForm();
    });

    // Add New Phone Number Input
    contactPage.on('click', '#contact_add_phone_number', function () {

        addNumberButton.before(
            $('<input>')
                .addClass('form-control custom_created')
                .attr('type', 'text')
                .attr('name', 'phone_number_')
        );
    });

    // Create Or Update Contact
    form.on('submit', function (e) {
        e.preventDefault();

        const data = form.serializeArray();
        let url = '';

        if (form.attr('data-action') === 'create') {
            url = CONFIGS.api_url + "/contacts/create";
        } else {
            url = CONFIGS.api_url + "/contacts/update/" + form.attr('data-contact_id');
        }

        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(data),
            success: function (result) {

                if (result.status !== 'success') {

                    //TODO Show Error Message
                    return;
                }

                contactListPage.show();
                contactPage.hide();
                resetContactForm();

                getContactList();
                //TODO Show Success Message
            }
        })
    })
});