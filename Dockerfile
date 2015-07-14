FROM boot2docker/boot2docker

# Mount all data shares with full read-write access.
RUN sed -i -e \
  "s/mountOptions='defaults'/mountOptions='defaults,fmode=777,dmode=777'/" \
  $ROOTFS/etc/rc.d/automount-shares

# Add our own profile script to prevent the Docker daemon from starting before
# it has a network.
ADD ./conf/profile $ROOTFS/var/lib/boot2docker/profile

RUN /make_iso.sh

CMD ["cat", "boot2docker.iso"]
