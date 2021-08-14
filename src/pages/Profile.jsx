import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonNote, IonPage, IonRow, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { collections, people, tags } from '../data';

import styles from "./Profile.module.scss";

const Profile = () => {

	const { id } = useParams();
	const router = useIonRouter();
	const headingRef = useRef();
	const [ slideSpace, setSlideSpace ] = useState(0);
	const [ profile, setProfile ] = useState([]);

	useIonViewWillEnter(() => {

		setSlideSpace(5);
	});

	useEffect(() => {
	
		headingRef.current.classList.add("animate__slideInLeft");
		headingRef.current.style.display = "";
	}, []);

	useEffect(() => {

		const getProfile = async () => {

			const person = await people.filter(person => parseInt(person.id) === parseInt(id))[0];
			setProfile(person);
		}

		getProfile();
	}, [ id ]);

	return (
		<IonPage>
			<IonHeader>
				<div className={ styles.customHeader }>
					<img src={ profile.cover } className="animate__animated" alt="header" />

					<div className="ion-justify-content-between">
						<div className={ styles.customBackButton } onClick={ () => router.goBack() }>
							<IonIcon icon={ chevronBack } />
						</div>
					</div>

					<div className={ `${ styles.mainContent } animate__animated` } ref={ headingRef } style={{ display: "none" }}>

						<IonGrid>
							<IonRow>
								<IonCol size="12" className={ styles.profileHeaderContainer }>
									<img src={ profile.image } className={ styles.avatar } alt="avatar" />
									<IonCard className={ styles.profileHeader }>
										<IonCardContent className={ styles.profileDetails }>
											<IonCardTitle>{ profile.name }</IonCardTitle>
											<p>{ profile.location }</p>

											<IonRow className={ styles.profileStats }>
												<IonCol size="4">
													<IonCardSubtitle>Purchased</IonCardSubtitle>
													<IonNote>{ profile.purchased }</IonNote>
												</IonCol>

												<IonCol size="4">
													<IonCardSubtitle>Wished</IonCardSubtitle>
													<IonNote>{ profile.wished }</IonNote>
												</IonCol>

												<IonCol size="4">
													<IonCardSubtitle>Likes</IonCardSubtitle>
													<IonNote>{ profile.likes }</IonNote>
												</IonCol>
											</IonRow>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</div>
				</div>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid className="animate__animated animate__fadeIn">
					<IonRow>
						<IonCol size="12">
							<IonCardTitle className={ styles.title }>Collection</IonCardTitle>
						</IonCol>
					</IonRow>
				</IonGrid>

					<div className={ ` ${ styles.collections } animate__animated animate__slideInRight` }>
						<Swiper spaceBetween={ slideSpace } slidesPerView={ 2.5 }>
							{ collections.map((collection, index) => {

								return (

									<SwiperSlide>
										<IonCard className={ styles.collectionCard }>
											<img src={ collection.image } alt="collection" />

											<div className={ styles.collectionDetails }>

												<IonCardTitle>{ collection.name }</IonCardTitle>
												<IonNote>{ collection.no } wardrobes</IonNote>
											</div>
										</IonCard>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				
				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonCardTitle className={ styles.title }>Tags</IonCardTitle>
						</IonCol>
					</IonRow>

					<IonRow className="animate__animated animate__slideInLeft">
						{ tags.map((tag, index) => {

							return <IonCol className={ styles.tag } key={ `tag_${ index }` } size="4">{ tag }</IonCol>;
						})}
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
