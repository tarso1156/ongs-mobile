import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';

import styles from './styles';

const logo = require('../../assets/logo.png');

export default () => {
    const [incidents, setIncidents] = useState<any>([]);
    const [total, setTotal] = useState<number>(0);

    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation();
    const navigateToDetail = (incident: any) => {
        navigation.navigate('Detalhar', { incident })
    };
    const indexIncidents = async () => {
        if (loading) {
            return;
        }
        if (total > 0 && incidents.length === total) {
            return;
        }
        setLoading(true);
        const resp = await api.get('incidents', { params: { page } });
        setIncidents([ ...incidents, ...resp.data ]);
        //Pegar header X-Total-Count (nao esta funcionando)
        setTotal(total + resp.data.length + 1);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        indexIncidents();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={{ width: 60, height: 60 }}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} Casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo.</Text>
            <FlatList data={incidents} style={styles.incidentList} keyExtractor={incident => String(incident.id)}
                onEndReached={indexIncidents}
                showsVerticalScrollIndicator={false} renderItem={({ item: incident }) => (
                    <View style={styles.incidentList}>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>
                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>
                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                            </Text>
                            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size="16" color="#E02041"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}/>
        </View>
    )
}