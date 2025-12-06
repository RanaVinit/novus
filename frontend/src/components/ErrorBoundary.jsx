import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="pt-24 flex justify-center">
          <p className="text-gray-500">Something went wrong. Please reload.</p>
        </div>
      );
    }
    return this.props.children;
  }
}