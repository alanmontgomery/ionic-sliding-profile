import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { people } from '../data';
import styles from "./Home.module.scss";

const Home = () => {
	
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Profiles</IonTitle>
				</IonToolbar>
			</IonHeader>
			
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Profiles</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList>
					{ people.map((person, index) => {

						return (

							<IonItem key={ `person_${ index }` } lines="full" detail={ true } routerLink={ `/profile/${ person.id }` } className={ styles.listItem }>

								<img src={ person.image } className={ styles.listAvatar } alt="list avatar" />
								<IonLabel>
									<h1>{ person.name }</h1>
									<p>{ person.location }</p>
								</IonLabel>
							</IonItem>
						);
					})}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
