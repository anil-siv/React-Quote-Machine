// initialise variable for fetch response
let quoteObj;

class QuoteText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p id="text" style={{ color: this.props.color, fontSize: 36 }}>
          <i className="fa fa-quote-left"> </i> {this.props.text}
        </p>
      </div>
    );
  }
}

class QuoteAuthor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p
          id="author"
          style={{
            color: this.props.color,
            textAlign: "right",
            fontStyle: "italic"
          }}
        >
          {this.props.author}
        </p>
      </div>
    );
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
            this.props.text
          )}%20${encodeURIComponent(this.props.author)}`}
          target="_blank"
          id="tweet-quote"
        >
          {" "}
          <button className="btn btn-secondary" style={{ margin: "5px" }}>
            {" "}
            <i className="fa fa-twitter"></i> Tweet Me
          </button>
        </a>
        <button
          id="new-quote"
          className="btn btn-secondary"
          style={{ margin: "5px" }}
          onClick={this.props.newQuote}
        >
          New Quote
        </button>
      </div>
    );
  }
}

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: 500,
          maxWidth: "80vw",
          margin: "0 auto",
          position: "relative",
          top: "15vh",
          textAlign: "center"
        }}
        className="container rounded"
      >
        <h1 style={{ color: this.props.color }}>Quote Machine</h1>
        <QuoteText text={this.props.text} color={this.props.color} />
        <QuoteAuthor author={this.props.author} color={this.props.color} />
        <Buttons
          newQuote={this.props.newQuote}
          text={this.props.text}
          author={this.props.author}
        />
        <p style={{ color: this.props.color, textAlign: "right" }}>
          By Anil Sivarajah
        </p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      quoteText: null,
      quoteAuthor: null
    };
    this.newQuote = this.newQuote.bind(this);
  }

//on first load grab quote data and pass to newQuote function
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((response) => response.json())
      .then(function (jsonQuotes) {
        quoteObj = jsonQuotes["quotes"];
      })
      .then(() => this.newQuote());
  }

//populate state with fetch return
  newQuote() {
    const colors = [
      "#540D6E",
      "#EE4266",
      "#FFD23F",
      "#3BCEAC",
      "#0EAD69",
      "#51344D"
    ];
    let setColor = colors[Math.floor(Math.random() * 6)];

    let randomNum = Math.floor(Math.random() * 102);
    this.setState({
      color: setColor,
      quoteText: quoteObj[randomNum]["quote"],
      quoteAuthor: quoteObj[randomNum]["author"]
    });
  }

  render() {
    return (
      <div
        style={{ backgroundColor: this.state.color, height: "300vh" }}
        className="container-fluid"
      >
        <QuoteBox
          className="container"
          text={this.state.quoteText}
          author={this.state.quoteAuthor}
          newQuote={this.newQuote}
          color={this.state.color}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("quote-box"));


