/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, Row, Col, FormControl, ButtonGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import FontAwesome from 'react-fontawesome';
import Loading from '/imports/ui/components/Loading/Loading';

class DocumentEditor extends React.Component {
    
    componentDidMount() {
        const component = this;
        validate(component.form, {
            rules: {
                title: {
                    required: true,
                },
                body: {
                    required: true,
                },
                labels: {
                    required: true,
                },
            },
            messages: {
                title: {
                    required: 'The title is required for the document',
                },
                body: {
                    required: 'The body is required on the document',
                },
                labels: {
                    required: 'You need to specify what type of document this is',
                },
            },
            submitHandler() { component.handleSubmit(); },
        });
        
        component.setLabels();
    }

    getLabels()
    {
        var a = [];
        $(".Document-editor input[type=checkbox]").each(function()
        {
            $(this).is(':checked') ? a.push($(this).val()) : '';
        });
        return a;
    }

    setLabels() {
        const { doc } = this.props;
        $(doc.labels).each(function(i,v)
        {
            $("#checkbox-" + v).prop('checked', true);
        });
    }

    handleSubmit() {
        const { history } = this.props;
        const existingDocument = this.props.doc && this.props.doc._id;
        const methodToCall = existingDocument ? 'documents.update' : 'documents.insert';
        const doc = {
            title: this.title.value.trim(),
            body: this.body.value.trim(),
            labels: this.getLabels(),
        };

        if (existingDocument) doc._id = existingDocument;

        Meteor.call(methodToCall, doc, (error, documentId) => {
            if (error) {
                Bert.alert(error.reason, 'danger');
            } else {
                const confirmation = existingDocument ? 'Document updated!' : 'Document added!';
                this.form.reset();
                Bert.alert(confirmation, 'success');
                history.push(`/documents/${documentId}`);
            }
        });
    }

    render() {
        const { doc, loading } = this.props;
        return ( !loading ? (
            <div className="Document-editor">
                <Row>
                    <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            
                        <Col xs={12} md={6}>
                            
                            <h4>Document</h4>

                            <FormGroup>
                                <ControlLabel>Title</ControlLabel>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    ref={title => (this.title = title)}
                                    defaultValue={doc && doc.title}
                                    placeholder="Title goes here"
                                />
                            </FormGroup>

                            <FormGroup>
                                <ControlLabel>Body</ControlLabel>
                                <textarea
                                    className="form-control"
                                    name="body"
                                    ref={body => (this.body = body)}
                                    defaultValue={doc && doc.body}
                                    placeholder="Write your document here"
                                />
                            </FormGroup>

                            <Button type="submit" bsStyle="success">
                                {doc && doc._id ? 'Save Changes' : 'Add Document'}
                            </Button>
                        </Col>

                        <Col xs={12} md={6}>
                            
                            <h4>Labels</h4>

                            <Checkbox title="Announcement" />
                            <Checkbox title="News" />
                            <Checkbox title="Blog" />
                            <Checkbox title="Insurgency" />
                            <Checkbox title="Hockey" />
                                
                        </Col>

                    </form>
                </Row>
            </div>
        ) : '<Loading />');
    }
}

const Checkbox = ({title}) => (
    <FormGroup className="fancy-checkbox">
        <input type="checkbox" name={`checkbox-${title}`} id={`checkbox-${title}`} value={title} />
        <ButtonGroup>
            <label htmlFor={`checkbox-${title}`} className="btn btn-primary">
                <FontAwesome name="check" />
                <span> </span>
            </label>
            <label htmlFor={`checkbox-${title}`} className="btn btn-default active">
                {title}
            </label>
        </ButtonGroup>
    </FormGroup>
);

DocumentEditor.defaultProps = {
    doc: { title: '', body: '', labels: [] },
};

DocumentEditor.propTypes = {
    doc: PropTypes.object,
    history: PropTypes.object.isRequired,
    loading: PropTypes.object,
};

export default DocumentEditor;
