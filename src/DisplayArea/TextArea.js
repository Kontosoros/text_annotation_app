import "./TextArea.css";

const TextArea = props => {
  
  return <textarea className="large-textarea" value={props.text} />;
};

export default TextArea;
