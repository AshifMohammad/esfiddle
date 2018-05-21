import * as React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import Editor from './components/Editor/Editor';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import NotFound from './components/NotFound/NotFound';

interface IAppState {
	headerStyle: string,
	user?: object
}

class App extends React.Component<{}, IAppState> {
	public constructor(props: {}) {
		super(props);
		this.state = {
			headerStyle: "dark",
			user: undefined,
		};
		this.onScroll = this.onScroll.bind(this)
	}
	public onScroll() {
		const elems = Array.prototype.slice.call(document.querySelectorAll('.header-change-light, .header-change-dark'));
		const elem = elems.find((e: HTMLElement) => {
			const bounding = e.getBoundingClientRect();
			return (bounding.top + bounding.height) > 60
		});
		console.log(elem) // tslint:disable-line
		if (elem) {
			this.setState({
				headerStyle: elem.classList.contains('header-change-light') ? 'light' : 'dark'
			})
		}
	}
	public componentDidMount() {
		window.addEventListener('scroll', this.onScroll)
		this.onScroll();
	}
	public render() {
		return (
			<div>
				<Router>
					<div>
						<Header theme={this.state.headerStyle}/>
						<Switch>
							<Route exact={true} path="/" component={Landing} />
							<Route path="/editor" component={Editor} />

							<Route component={NotFound} />
						</Switch>
						<Footer />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
