package org.notification.service.repository;

import org.notification.service.entity.DeviceMapping;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceMappingRepository extends JpaRepository<DeviceMapping, String> {
}

