from flask import jsonify, request, g, url_for
from app.crossdomain import crossdomain
from app.api_1_0.errors import not_found, bad_request
from app.exceptions import ModelNotFound, ValidationError
from ..models import Ticket, TicketState
from . import api


@api.route('/tickets/', methods=['GET', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def get_tickets():
    return jsonify({
        'tickets': [ticket.get_attrs(True) for ticket in g.db.get_tickets()],
        'count': g.db.get_tickets_count()
    })


@api.route('/tickets/', methods=['POST'])
@crossdomain(origin="*", headers=['Content-Type'])
def new_ticket():
    # TODO: in postman use raw request with
    # header Content-Type application/json
    # message "{\"message\": \"sdadasdasd\", \"subject\": \"asdadad\", \"email\": \"\"}"
    try:
        ticket = Ticket.from_json(request.get_json())
    except ValidationError as e:
        return bad_request(str(e))
    else:
        g.db.add_ticket(ticket)
    return jsonify(ticket.get_attrs(True)), 201, {'Location': url_for('api.get_ticket', id=ticket.id, _external=True)}


@api.route('/tickets/<int:id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def get_ticket(id):
    try:
        ticket = Ticket.from_db(g.db.get_ticket(id))
    except ModelNotFound as e:
        return not_found(str(e))

    ticket_attrs = ticket.get_attrs(True)
    ticket_attrs.update({
        'comments':  [comment.get_attrs() for comment in g.db.get_comments(id)]
    })
    return jsonify(ticket_attrs)


@api.route('/tickets/<int:id>/close/', methods=['PUT', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def close(id):
    ticket = Ticket.from_db(g.db.get_ticket(id))
    ticket.update_state(force_close=True)
    g.db.save_ticket(ticket)
    return jsonify(ticket.get_attrs(True)), 201, {'Location': url_for('api.get_ticket', id=ticket.id, _external=True)}


@api.route('/tickets/<int:id>/next_state/', methods=['PUT', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def set_state(id):
    ticket = Ticket.from_db(g.db.get_ticket(id))
    ticket.update_state()
    ticket = g.db.save_ticket(ticket)
    return jsonify(
        {
            'ticket': ticket.get_attrs(True),
            'next_state': TicketState.string_state(TicketState.get_next_state(ticket.state))
        },
        201,
        {
            'Location': url_for('api.get_ticket', id=ticket.id, _external=True)
        }
    )
