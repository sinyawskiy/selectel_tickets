from flask import jsonify, request, g, url_for
from app.crossdomain import crossdomain
from app.api_1_0.errors import not_found, ticket_closed
from app.exceptions import ModelNotFound
from app.models import Comment, Ticket, TicketState
from . import api


@api.route('/comments/', methods=['GET', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def get_comments():
    return jsonify({
        'comments': [comment.get_attrs() for comment in g.db.get_comments()],
        'count': g.db.get_comments_count()
    })


@api.route('/comments/<int:id>', methods=['GET', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def get_comment(id):
    try:
        comment = g.db.get_comment(id)
    except ModelNotFound as e:
        return not_found(e.str(e))
    else:
        return jsonify(comment.get_attrs())


@api.route('/tickets/<int:id>/comments/', methods=['GET', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def get_ticket_comments(id):
    return jsonify({
        'comments': [comment.get_attrs() for comment in g.db.get_comments(id)],
        'count': g.db.get_comments_count(id)
    })


@api.route('/tickets/<int:id>/comments/', methods=['POST', 'OPTIONS'])
@crossdomain(origin="*", headers=['Content-Type'])
def new_ticket_comment(id):
    try:
        ticket = Ticket.from_db(g.db.get_ticket(id))
    except ModelNotFound as e:
        return not_found(str(e))
    else:
        if ticket.state == TicketState.CLOSED:
            return ticket_closed(ticket_id=id)
        else:
            comment = Comment.from_json(request.get_json(), ticket_id=id)
            g.db.add_comment(comment)
            return jsonify(comment.get_attrs()), 201, {'Location': url_for('api.get_comment', id=comment.id, _external=True)}
