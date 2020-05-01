import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onClick = () => {
    this.props.deleteStream(this.props.match.params.id);
  };
  renderActions() {
    return (
      <React.Fragment>
        <button onClick={this.onClick} className="ui negative button">
          Delete
        </button>
        <Link to="/" className="ui primary button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure want to delete this Stream ?";
    }
    return (
      <p>
        Are You sure want to delete this Stream with title :
        <strong> {this.props.stream.title} </strong>
      </p>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
