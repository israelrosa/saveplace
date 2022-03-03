import ChipTag from 'components/ChipTag';
import QueueCard from 'components/QueueCard';
import SearchInput from 'components/SearchInput';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { useAppDispatch, useAppSelector } from 'hooks/storeHook';
import { getTags } from 'store/actions/tagActions';
import { getQueues } from 'store/actions/queueActions';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, FiltersContainer, Header, HeaderText } from './styles';

const Search: React.FC = () => {
  // const [location, setLocation] = useState(null);
  const [selectedTag, setSelectedTag] = useState({});
  const [search, setSearch] = useState('');
  const theme = useTheme();
  const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { tag, queue } = useAppSelector(state => state);

  TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(locations);
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1, // minimum change (in meters) betweens updates
        deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would
        // be if the app was open
        foregroundService: {
          notificationTitle: 'Using your location',
          notificationBody: 'To turn off, go back to the app and switch something off.',
        },
      });
    })();
  }, []);

  useEffect(() => {
    dispatch(getQueues({ search, tagId: selectedTag.id, skip: 0, limit: 0 }));
  }, [search, selectedTag]);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={theme.colors.primary} style="light" />
      <Header>
        <HeaderText>Estabelecimentos</HeaderText>
        <SearchInput searchQuery={search} onChangeSearch={text => setSearch(text)} placeholder="Buscar" />
      </Header>
      <FiltersContainer horizontal showsHorizontalScrollIndicator={false}>
        <ChipTag onSelect={() => setSelectedTag({})} style={{ marginLeft: 24 }} text="Todos" selected={!selectedTag.id} />
        {tag && tag.data?.map((tagData) => (
          <ChipTag
            onSelect={() => setSelectedTag(tagData)}
            key={tagData.name}
            text={tagData.name}
            selected={selectedTag.id === tagData.id}
          />
        ))}
      </FiltersContainer>
      <Content>
        {queue && queue.publicQueues?.items?.map(publicQueue => (
          <QueueCard
            key={publicQueue.id}
            style={{ marginBottom: 12 }}
            onPress={() => navigation.navigate('SearchQueueDetails', { id: publicQueue.id })}
            title={publicQueue.name}
            tagId={publicQueue.tagId}
            numberOfPeople={publicQueue.numberOfPeople || 0}
            waitingTimeMinutes={publicQueue.waitingTimeMinutes || 0}
            image="http://www.stevnserhvervsraad.dk/wp-content/uploads/blank-avatar.png"
          />
        ))}
      </Content>
    </Container>
  );
};

export default Search;
