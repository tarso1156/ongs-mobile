import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

const logo = require('../../assets/logo.png');

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { incident } = Object(route.params);

    const message = `Olá ${incident.name} entrando em contato!${incident.value}'`;
    const navigateBack = () => {
        navigation.goBack();
    }

    const sendMail = () => {
        MailComposer.composeAsync({
             subject: `Heroi do Caso: ${incident.title}`,
             recipients: [incident.email],
             body: message
        });
    }

    const sendWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&t=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={{ width: 60, height: 60 }}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size="28" color="#E82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                <Text style={styles.incidentProperty}>VALOR:</Text>
    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
