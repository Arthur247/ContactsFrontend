$(function () {

    const contactListPage = $("#contact_list");

    // Add New Number Input
    contactListPage.on('click', '.contact_list_add_number', function () {
        const contact_id = this.id;

        $(this).before(
            $('<form></form>')
                .addClass('phone_number')
                .append(
                    $('<div></div>')
                        .addClass('input-group')
                        .append(
                            $('<input>')
                                .addClass('form-control')
                                .attr('id', contact_id)
                                .attr('type', 'text')
                                .attr('name', 'phone_number'),
                            $('<div></div>')
                                .addClass('input-group-btn')
                                .append(
                                    $('<button></button>')
                                        .addClass('btn btn-default')
                                        .attr('type', 'button')
                                        .text('+')
                                        .attr('id', contact_id)
                                        .addClass('contact_list_submit_number')
                                )
                        )
                )
        )
    });

    // Create Contact Number
    contactListPage.on('click', '.contact_list_submit_number', function () {
        const me = $(this),
            contact_id = this.id,
            numberValue = me.closest('.input-group').find('input').val();

        if (numberValue === '') {
            return;
        }

        $.ajax({
            type: 'POST',
            url: CONFIGS.api_url + "/phoneNumbers/create/" + contact_id,
            contentType: "application/json",
            dataType: 'json',
            data: numberValue,
            success: function (result) {

                if (result.status !== 'success') {

                    //TODO Show Error Message
                    return;
                }

                me.remove();
                //TODO Show Success Message
            }
        })
    });
});